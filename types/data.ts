export type Difficulty = "easy" | "normal" | "hard";
export type SequenceType = "break" | "exercise" | "stretch";

export interface Workout {
  slug: string;
  name: string;
  duration: number;
  difficulty: Difficulty;
  sequence: Array<SequenceItem>; //  SequenceItem[]
}

export interface SequenceItem {
  slug: string;
  name: string;
  type: SequenceType;
  duration: number;
  reps?: number; //reps olabilir yada olmayabilir, soru isaretiyle bunu belirttik, olmak zorunda degil, optional parametre
}
