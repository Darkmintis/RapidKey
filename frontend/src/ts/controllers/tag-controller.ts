import * as ModesNotice from "../elements/modes-notice";

export function saveActiveToLocalStorage(): void {
  // no-op without account
}

export function clear(_nosave = false): void {
  void ModesNotice.update();
}

export function set(_tagid: string, _state: boolean, _nosave = false): void {
  void ModesNotice.update();
}

export function toggle(_tagid: string, _nosave = false): void {
  void ModesNotice.update();
}

export function loadActiveFromLocalStorage(): void {
  // no-op without account
}
