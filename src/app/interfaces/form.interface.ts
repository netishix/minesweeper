import { FormGroup } from "@angular/forms";

export interface FormInterface {
  isSubmitted: boolean;
  isLoading: boolean;
  selectOptions: {
    [key: string]: {name: string, value: string | number}[]
  };
  errors: {
    [key: string]: any;
  };
  fg: FormGroup;
}
