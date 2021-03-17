import { FormGroup } from "@angular/forms";

export interface FormInterface {
  isSubmitted: boolean,
  selectOptions: {
    [key: string]: {name: string, value: string | number}[]
  };
  fg: FormGroup;
}
