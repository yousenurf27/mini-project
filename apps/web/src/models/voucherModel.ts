export type DataVoucher = {
  id: string;
  name: string;
  type: string;
  points: number | null;
  discount: number | null;
  expAt: Date;
}
