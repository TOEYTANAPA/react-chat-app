import { MAX_MESSAGE } from "../global/consts";

// This function will try to populate a chatbox upto 10 message all the time
// Also conformize normalize new incoming msg
export const handleNewMsg = (oldMsg: any, newMsg: any, old: Boolean) => {
  if (!old) {
    newMsg = newMsg.reverse();
  }

  let toFillNo = MAX_MESSAGE - newMsg.length;
  if (toFillNo === 0) {
    return newMsg;
  }
  if (old) {
    return oldMsg.slice(-toFillNo).concat(newMsg);
  } else {
    return newMsg.concat(oldMsg.slice(0, toFillNo - 1));
  }
};
