export interface IWsFormat<T> {
  /** 用户socket_id */
  socket_id: string;
  /** 用户信息 */
  data: T;
}

export type WsOfferType = IWsFormat<{
  sdp: RTCSessionDescriptionInit;
  room_id: string;
  sender: string;
  receiver: string;
}>;

export type WsAnswerType = IWsFormat<{
  sdp: RTCSessionDescriptionInit;
  room_id: string;
  sender: string;
  receiver: string;
}>;

export type WsCandidateType = IWsFormat<{
  room_id: string;
  candidate: RTCIceCandidate;
  sender: string;
  receiver: string;
}>;

export type WsJoinType = IWsFormat<{
  room_id: string;
}>;

export type WsOtherJoinType = IWsFormat<{
  room_id: string;
  join_socket_id: string;
  socket_list: string[];
}>;

export type WsLeaveType = IWsFormat<{
  socket_id: string;
}>;

// websocket消息类型
export enum WsMsgTypeEnum {
  offer = 'offer',
  answer = 'answer',
  candidate = 'candidate',

  join = 'join',
  joined = 'joined',
  leave = 'leave',
  otherJoined = 'otherJoined',
  startLive = 'startLive',
  message = 'message',

  connection = 'connection',
  connect = 'connect',
  disconnect = 'disconnect',
  connect_error = 'connect_error',
}
