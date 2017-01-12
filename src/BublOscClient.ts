// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

import {OscClient, CommandResult} from './OscClient'

export class BublOscClient extends OscClient {

  // OSC BUBL UPDATE
  bublUpdate(updateFileBin: any) {
    let bublUpdateUrl = this.serverAddress + '/osc/_bublUpdate'
    return this.oscRequest('POST', bublUpdateUrl, updateFileBin, 'application/octet-stream')
  }

  // OSC BUBL GET IMAGE
  bublGetImage(fileUri: string) {
    let bublGetImageUrl = this.serverAddress + '/osc/_bublGetImage/'
    return this.oscRequest('GET', bublGetImageUrl + encodeURIComponent(fileUri))
  }

  // BUBL STOP
  bublStop(commandId: string) {
    let bublStopUrl = this.serverAddress + '/osc/commands/_bublStop'
    return this.oscRequest('POST', bublStopUrl, { id: commandId })
  }

  // BUBL POLL
  bublPoll(commandId: string, fingerprint: string, waitTimeout: number) {
    let bublPollUrl = this.serverAddress + '/osc/commands/_bublPoll'
    let id = commandId
    return this.oscRequest('POST', bublPollUrl, { id, fingerprint, waitTimeout })
  }

  // BUBL COMMANDS CAPTURE VIDEO
  bublCaptureVideo(sessionId: string): Promise<CommandResult<any>> {
    return this.commandsRequest('camera._bublCaptureVideo', { sessionId })
  }

  // OSC COMMANDS BUBL TIMELAPSE
  bublTimelapse(sessionId: string) {
    return this.commandsRequest('camera._bublTimelapse', { sessionId })
  }

  // OSC COMMANDS BUBL STREAM
  bublStream(sessionId: string) {
    return this.commandsRequest('camera._bublStream', { sessionId })
  }

  // OSC COMMANDS BUBL SHUTDOWN
  bublShutdown(sessionId: string, shutdownDelay: number) {
    return this.commandsRequest('camera._bublShutdown', { sessionId, shutdownDelay })
  }
}
