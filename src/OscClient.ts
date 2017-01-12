// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.s

import makeError = require('make-error')
import {Request} from 'popsicle'
import popsicle = require('popsicle')
// import {Buffer} from 'buffer'

export type COMMAND_STATE = 'done' | 'inProgress' | 'error'

export interface CommandError {
  code: string
  message: string
}

export interface CommandResult<T> {
  name: string
  state: COMMAND_STATE
  id?: string
  results?: T
  error?: CommandError
  progress?: Object
}

export class OscError extends makeError.BaseError {
  code: string

  constructor(err: CommandError) {
    super(err.message)
    this.code = err.code
  }
}

export class OscClient {

  protected _serverAddress: string

  constructor(domain: string = 'localhost', port: number = 8000) {
    this._serverAddress = 'http://' + domain + ':' + port
  }

  public serverAddress() {
    return this._serverAddress
  }

  public getInfo() {
    let infoUrl = this._serverAddress + '/osc/info'
    return this.oscRequest('GET', infoUrl)
  }

  public getState() {
    let stateUrl = this._serverAddress + '/osc/state'
    return this.oscRequest('POST', stateUrl)
  }

  // OSC CHECK FOR UPDATES
  public checkForUpdates(stateFingerprint: string, waitTimeout: number) {
    let checkForUpdatesUrl = this._serverAddress + '/osc/checkForUpdates'
    let body = {'stateFingerprint': stateFingerprint, 'waitTimeout': waitTimeout}
    return this.oscRequest('POST', checkForUpdatesUrl, body)
  }

  // OSC COMMANDS START SESSION
  public startSession(timeout?: number): Promise<CommandResult<{sessionId: string, timeout: number}>> {
    return this.commandsRequest('camera.startSession', { timeout })
  }

  // OSC COMMANDS UPDATE SESSION
  public updateSession(sessionId: string, timeout: number
                      ): Promise<CommandResult<{sessionId: string, timeout: number}>> {
    return this.commandsRequest('camera.updateSession', { sessionId: sessionId, timeout: timeout })
  }

  // OSC COMMANDS CLOSE SESSION
  public closeSession(sessionId: string): Promise<CommandResult<void>> {
    return this.commandsRequest('camera.closeSession', { sessionId})
  }

  // OSC COMMANDS TAKE PICTURE
  public takePicture(sessionId: string): Promise<CommandResult<{fileUri: string}>> {
     return this.commandsRequest('camera.takePicture', { sessionId})
  }

  // OSC COMMANDS LIST IMAGES
  public listImages(entryCount: number, continuationToken?: string, includeThumb: boolean = true, maxSize?: number
                   ): Promise<CommandResult<{entries: [Object], totalEntries: number, continuationToken?: string }>> {
    let body = { entryCount, includeThumb, maxSize, continuationToken}
    return this.commandsRequest('camera.listImages', body)
  }

  // OSC COMMANDS DELETE
  public delete(fileUri: string): Promise<CommandResult<void>> {
    return this.commandsRequest('camera.delete', { fileUri: fileUri })
  }

  // OSC COMMANDS GET IMAGE
  public getImage(fileUri: string, maxSize?: number) {
    return this.binaryCommandsRequest('camera.getImage', { fileUri, maxSize })
  }

  // OSC COMMANDS GET METADATA
  public getMetadata(fileUri: string) {
    return this.commandsRequest('camera.getMetadata', { fileUri: fileUri })
  }

  // OSC COMMANDS SET OPTIONS
  public setOptions(sessionId: string, options: Object): Promise<CommandResult<void>> {
    return this.commandsRequest('camera.setOptions', { sessionId, options})
  }

  // OSC COMMANDS GET OPTIONS
  public getOptions(sessionId: string, optionNames: Array<string>): Promise<CommandResult<{options: Object}>> {
    return this.commandsRequest('camera.getOptions', { sessionId, optionNames })
  }

  // OSC COMMANDS STATUS
  public commandStatus(commandId: string): Promise<CommandResult<any>> {
    let commandsStatusUrl = this._serverAddress + '/osc/commands/status'
    return this.oscRequest('POST', commandsStatusUrl, { id: commandId })
  }

  public poll<T>(commandId: string, statusCallback?: (res: CommandResult<any>) => void,
                 pollPeriod: number = 2000): Promise<CommandResult<T>> {
    return new Promise((onResolve, onReject) => {
      let intervalId = setInterval(
        () => {
          this.commandStatus(commandId).then((res) => {
            if (res.state === 'inProgress') {
              if (typeof statusCallback === 'function') {
                statusCallback(res)
              }
            } else {
              clearInterval(intervalId)
              onResolve(res)
            }
          }).catch(onReject)
        },
        pollPeriod)
    })
  }

  protected binaryCommandsRequest(name: string, parameters: Object): Promise<Buffer> {
    let commandsExecuteUrl = this._serverAddress + '/osc/commands/execute'
    let body = {name, parameters}
    let transport = popsicle.createTransport({type: 'buffer'})
    return new Promise((onResolve,onReject) => {
      return this.baseOscRequest('POST', commandsExecuteUrl, body, undefined, transport).then((res) => {
        onResolve(res.body)
      }).catch(onReject)
    })
  }

  protected commandsRequest(name: string, parameters: Object): Promise<CommandResult<any>> {
    let commandsExecuteUrl = this._serverAddress + '/osc/commands/execute'
    let body = {name, parameters}
    return this.oscRequest('POST', commandsExecuteUrl, body)
  }

  protected oscRequest(method: string, url: string, body?: Object,
                       contentType: string = 'application/json; charset=utf-8'): Promise<CommandResult<any>> {
    return this.baseOscRequest(method, url, body, contentType)
    .use(popsicle.plugins.parse('json')).then((res: any) => {
      if (res.body && res.body.state === 'error' && res.body.error) {
        throw new OscError(res.body.error)
      } else {
        return res.body
      }
    })
  }

  private baseOscRequest(method: string, url: string, body?: Object,
                         contentType: string = 'application/json; charset=utf-8',
                         transport = popsicle.createTransport({type: 'text'}) ): Request {
    return popsicle.request({ method, url, body, transport,
      headers: {
        'Content-Type': contentType,
        'X-XSRF-Protected': '1'
      }
    })
  }
}
