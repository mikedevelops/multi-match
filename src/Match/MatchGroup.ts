import { Match } from "./Match";

export class MatchGroup {
  private matches: Match[] = [];

  public addMatch(match: Match): void {
    this.matches.push(match);
  }

  public getMatches(): Match[] {
    return this.matches;
  }

  public hasMatches(): boolean {
    return this.matches.length > 0;
  }

  /**
   * Consolidate matches into a single match
   */
  public consolidate(): Match {
    if (this.matches.length === 0) {
      throw new Error("Cannot consolidate a group with no matches");
    }

    // Arbitrarily take the source from the first match
    const source = this.matches[0].source;
    const match = new Match(source);

    this.matches.forEach(m => {
      m.getFullMatch().forEach(tile => match.addTile(tile));
    });

    return match;
  }
}

