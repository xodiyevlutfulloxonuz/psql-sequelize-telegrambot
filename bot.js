const TelegramBot=require('node-telegram-bot-api')
const UserModel=require('./main')
const TOKEN="1815371723:AAHSMOhE7h-7Sqc2dIrkzKH3JunytowSZAM"

const bot=new TelegramBot(TOKEN,{
    polling:true
})
bot.on('message',async(message)=>{
    const chatId=message.chat.id 
    let model=await UserModel()
    let user= await model.findOne({
        where:{
            chat_id:chatId
        }
    })
    if(message.text=='/users'){
        let dbusers=await model.findAll({})
        dbusers.forEach(item=>{
            console.log(item.dataValues)
        })
    }
      
    if(!user){
        await model.create({chat_id:chatId})
        gretting(chatId)
    }
    else if(user.dataValues.step==1 && message?.text && message?.text.length>3 && message?.text.length<30){
        model.update({
            name:message.text,
            step:2
        },{
           where:{
               chat_id:chatId 
           } 
        })
        bot.sendMessage(chatId,"Ismingiz qabul qilindi. Yoshingizni kiriting.")
    }
    else if(user.dataValues.step==2 && !isNaN(Number(message.text)) && message.text>16 && message.text<100){
        model.update({
            age:Number(message.text),
            step:3
        },{
           where:{
               chat_id:chatId 
           } 
        })
        bot.sendMessage(chatId,"Yoshingiz qabul qilindi. Telefon raqamingizni kiriting.",{
            reply_markup:{
                keyboard:[
                    [
                        {text:"Raqam yuborish", request_contact:true}
                    ]
                ]
            }
        })
    } 
    else if(user.dataValues.step==3 && message.contact){
        model.update({
            step:4,
            phoneNumber:Number(message.contact.phone_number)
        },{
           where:{
               chat_id:chatId
           } 
        })
        bot.sendMessage(chatId,` Siz royxatdan o'tdingiz `)
    }
    else{
        bot.sendMessage(chatId, 'Siz oldin royxatdan otgansiz. ')
    }
   
    

})



function gretting(chatId){
  bot.sendMessage(chatId,"Salom botimizga xush kelibsiz. Ismingizni kiriting")
}