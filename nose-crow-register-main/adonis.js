const Discord = require('discord.js');//
const client = new Discord.Client();//
const Settings = require('./Settings/Settings.json');//
const Other = require('./Settings/Other.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./Util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = Settings.BotSettings.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./Commands/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} Adet Komut Yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./Commands/${f}`);//
        log(`[+] Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./Commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === Settings.BotSettings.Owner) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(Settings.BotSettings.token);

//-----------------------------------------------Komutlar------------------------------------------------\\
client.on("guildMemberAdd", async (member) => {
    member.roles.add(Settings.Roles.Unregister)
    member.setNickname(Settings.Welcome.WelcomeName)
    });
    
    
    
    
    client.on("ready", async () => {
      let botVoiceChannel = client.channels.cache.get(Settings.BotSettings.botVoiceChannelID);
      if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot Ses Kanalına Bağlanamıyor, Lütfen Ses Kanal ID'sini Kontrol Et."));
    });
    
    
    
    
    client.on("guildMemberAdd", member => {  
      let adonis = client.users.cache.get(member.id);
      require("moment-duration-format");
        const kurulus = new Date().getTime() - adonis.createdAt.getTime();  
     
          var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': Other.EmojiNumbers.Zero,
              '1': Other.EmojiNumbers.One,
              '2': Other.EmojiNumbers.Two,
              '3': Other.EmojiNumbers.Three,
              '4': Other.EmojiNumbers.Four,
              '5': Other.EmojiNumbers.Five,
              '6': Other.EmojiNumbers.Six,
              '7': Other.EmojiNumbers.Seven,
              '8': Other.EmojiNumbers.Eight,
              '9': Other.EmojiNumbers.Nine}[d];
            })
          }
      
      var voicecount = member.guild.members.cache.filter(s => s.voice.channel).size.toString().replace(/ /g, "    ")
      var voice = voicecount.match(/([0-9])/g)
      voicecount = voicecount.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(voice) {
          voicecount = voicecount.replace(/([0-9])/g, d => {
            return {
              '0': Other.EmojiNumbers.Zero,
              '1': Other.EmojiNumbers.One,
              '2': Other.EmojiNumbers.Two,
              '3': Other.EmojiNumbers.Three,
              '4': Other.EmojiNumbers.Four,
              '5': Other.EmojiNumbers.Five,
              '6': Other.EmojiNumbers.Six,
              '7': Other.EmojiNumbers.Seven,
              '8': Other.EmojiNumbers.Eight,
              '9': Other.EmojiNumbers.Nine}[d];
            })
          }
      
      var kontrol;
    if (kurulus < 1296000000) kontrol = `Şüpheli`
    if (kurulus > 1296000000) kontrol = `Güvenli`
      moment.locale("tr");
      const kanal = member.guild.channels.cache.get(Settings.Welcome.WelcomeChat)
      const kuruluss = new Date().getTime() - adonis.createdAt.getTime();  
      const gecen = moment.duration(kuruluss).format(`YY [yıl,] M [ay]`) 
 
  
      const adonismsg = new Discord.MessageEmbed()
      .setDescription(`**Merhaba ${adonis} Sunucumuza Hoş Geldin Seninle beraber ${üyesayısı} Kişiyiz!**
**Sunucumuzun Anlık Ses Aktifliği ${voicecount} Olarak Görüntülenmektedir!**
**Sunucumuza Kayıt Olmak İçin <@&${Settings.Roles.Registerer}> Yetkilerine Sahip Olan Arkadaşlar Seni Kayıt Etmek İçin Sol Tarafta Bulunan Kayıtsız Odalarda Bekliyor Olacak!**
Hesap Bilgilerin
:sag: Hesap ID: \`${adonis.id}\`
:sag: Katılım Sıralaması: \`${member.guild.memberCount}/${member.guild.memberCount}\`
:sag: Hesap Açılma Süresi: \`${gecen} önce\`
:sag: Hesabınız \`${kontrol}\` Görünmektedir :Likee:`)
      .setImage(`https://cdn.discordapp.com/attachments/756257192763457646/810648543437520916/image0.gif`)
      .setFooter(`Adonis ❤️ Serendia`)
      .setColor('RANDOM')
     kanal.send(adonismsg)
    })
 
      
  //------------------------------------------------------------------------------------------------------------------------------------\\
    
    