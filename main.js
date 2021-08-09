const {Sequelize, DataTypes}=require('sequelize')
const sequelize=new Sequelize('postgres://postgres:lutfulla1999@localhost:5432/soldb')

async function UserModel(){
    const User=sequelize.define('DbUsers',{
        chat_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true

        },
        step:{
            type:DataTypes.INTEGER,
            defaultValue: 1
        },
        name:{
            type:DataTypes.STRING(32)
            
        },
        age:{
         type:DataTypes.INTEGER
         
        },
        phoneNumber:{
            type:DataTypes.BIGINT,

        }
    })
  await   sequelize.sync()

    return User 
}

module.exports=UserModel