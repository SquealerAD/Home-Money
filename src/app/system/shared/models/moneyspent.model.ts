export class MoneySpent {
  money : number = 0;
  percentage : number = 0;
  getClass() : string{
    return this.percentage > 0 && this.percentage < 60 ? 'success' :
      this.percentage >= 60 && this.percentage < 100 ? 'warning' : 'danger';
  }
}
