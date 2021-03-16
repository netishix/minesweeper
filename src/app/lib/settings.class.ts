export class Settings {

  public soundOn: boolean;
  public autoSave: boolean;

  constructor(settings: {soundOn: boolean, autoSave: boolean}) {
    this.soundOn = settings.soundOn;
    this.autoSave = settings.autoSave;
  }

}
