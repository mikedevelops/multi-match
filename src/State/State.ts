export interface State {
  getName(): string;
  update(): State | null;
}
