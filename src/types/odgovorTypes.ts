export type Nepravilnost = {
  nepravilnost: string;
  clanak: string;
  objasnjenje: string;
};

export type Propis = {
  naziv:string;
  tekstOdluke: string;
  objasnjenje: string;
}

export type OdgovorDto = {
  nepravilnosti?: Nepravilnost[];
  propisi?: Propis[];
}