npx sequelize-cli model:generate --name Guarantee --attributes id:string,userId:string,locationId:string,isExpired:boolean
npx sequelize-cli model:generate --name Location --attributes id:string,name:string,address:string,numberofSlots:float
npx sequelize-cli model:generate --name Slot --attributes id:string,day:date,locationId:string,isReserved:boolean,userId:string
npx sequelize-cli model:generate --name User --attributes id:string,firstName:string,lastName:string,age:float,password:string,phoneNumber:string
npx sequelize-cli model:generate --name Waitlist --attributes id:string,userId:string,day:date,locationId:string