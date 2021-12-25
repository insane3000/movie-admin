export interface CashRegisterIT {
  _id?: string;
  createdAt: string;
  updatedAt: string;
  lastRecord: string;
  date: string;
  dashboard: {
    // [key: string]: string | number;
    //_id: string;
    date: string;
    server: string;
    totalSales: number;
    totalExpenses: number;
    pancafe: number;
    totalCash: number;
    balance: number;
  };
  sales: {
    [key: string]: string | number;
    //_id: string;
    name: string;
    cost: number;
    price: number;
    previousServer: number;
    load: number;
    currentServer: number;
    sales: number;
    profit: number;
    cash: number;
  }[];
  expenses: {
    [key: string]: string | number;
    //_id: string;
    name: string;
    detail: string;
    expense: number;
  }[];
}
export const cashRegisterTemplate: CashRegisterIT = {
  createdAt: "",
  updatedAt: "",
  lastRecord: "",
  date: "",
  dashboard: {
    //_id: "",
    date: "",
    server: "ninguno",
    totalSales: 0,
    totalExpenses: 0,
    pancafe: 0,
    totalCash: 0,
    balance: 0,
  },
  sales: [
    {
      //_id: "",
      name: "producto00",
      cost: 0,
      price: 0,
      previousServer: 0,
      load: 0,
      currentServer: 0,
      sales: 0,
      profit: 0,
      cash: 0,
    },
    // {
    //   //_id: "",
    //   name: "populares",
    //   cost: 0,
    //   price: 3.5,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "monster",
    //   cost: 0,
    //   price: 15,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "volt",
    //   cost: 0,
    //   price: 5,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "malta",
    //   cost: 0,
    //   price: 5,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "jugo",
    //   cost: 0,
    //   price: 3,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "aloe vera",
    //   cost: 0,
    //   price: 8,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "redbull",
    //   cost: 0,
    //   price: 11,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "agua 2l",
    //   cost: 0,
    //   price: 6,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "agua 6l",
    //   cost: 0,
    //   price: 15,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "chisitos",
    //   cost: 0,
    //   price: 2,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "papel",
    //   cost: 0,
    //   price: 2.5,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "marilan",
    //   cost: 0,
    //   price: 3,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "producto13",
    //   cost: 0,
    //   price: 0,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "producto14",
    //   cost: 0,
    //   price: 0,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "producto15",
    //   cost: 0,
    //   price: 0,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "producto16",
    //   cost: 0,
    //   price: 0,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
    // {
    //   //_id: "",
    //   name: "producto17",
    //   cost: 0,
    //   price: 0,
    //   previousServer: 0,
    //   load: 0,
    //   currentServer: 0,
    //   sales: 0,
    //   cash: 0,
    // },
  ],
  expenses: [
    {
      //_id: "",
      name: "gasto01",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto02",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto03",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto04",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto05",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto06",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto07",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto08",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto09",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto10",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto11",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto12",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto13",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "drako",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "jhasmy",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "zero",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "perro",
      detail: "",
      expense: 0,
    },
  ],
};

export const cashRegisterBasic: CashRegisterIT = {
  createdAt: "",
  updatedAt: "",
  lastRecord: "",
  date: "",
  dashboard: {
    //_id: "",
    date: "",
    server: "",
    totalSales: 0,
    totalExpenses: 0,
    pancafe: 0,
    totalCash: 0,
    balance: 0,
  },
  sales: [
    {
      //_id: "",
      name: "producto01",
      cost: 0,
      price: 0,
      previousServer: 0,
      load: 0,
      currentServer: 0,
      sales: 0,
      profit: 0,
      cash: 0,
    },
  ],
  expenses: [
    {
      //_id: "",
      name: "drako",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "jhasmy",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "zero",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "perro",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto01",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto02",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto03",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto04",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto05",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto06",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto07",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto08",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto09",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto10",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto11",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto12",
      detail: "",
      expense: 0,
    },
    {
      //_id: "",
      name: "gasto13",
      detail: "",
      expense: 0,
    },
  ],
};
