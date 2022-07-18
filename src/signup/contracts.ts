export interface Values {
  email: string;
  document: string;
  name: string;
  zipcode: string;
  streetAddress: string;
  city: string;
}

export type Steps = "basic-info" | "address" | "submitting";
