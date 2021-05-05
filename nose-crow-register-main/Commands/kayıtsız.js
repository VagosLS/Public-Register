const { MessageEmbed } = require('discord.js');
const Settings = require("../Settings/Settings.json")

exports.run = async (client, message, args) => {
  const unregister = message.guild.roles.cache.find(r => r.id === Settings.Roles.Unregister)
  const ravi2 = new MessageEmbed().setFooter("Adonis X Serendia").setColor(Settings.Colors.Red).setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
  if(![(Settings.Roles.yetkili)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(ravi2.setDescription("Bu Komut İçin Yetkiniz Bulunmamaktadır."))

  let embedx = new MessageEmbed()
  let users = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!users) return message.channel.send(embedx.setDescription(`Bir Üye Etiketlemelisin.`).setFooter("Adonis X Serendia").setTimestamp().setColor("RED"))

users.setNickname(users.user.username)
users.roles.add(Settings.Roles.Unregister);
users.roles.cache.forEach(r => {
users.roles.remove(r.id)
})
  let embed = new MessageEmbed()
  message.channel.send(embed.setDescription(`${users} Adlı Kullanıcı Başarıyla Kayıtsız'a Atıldı.`).setTimestamp().setColor("RED").setFooter("Adonis X Serendia"))
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız"]
};

module.exports.help = {
  name: 'kayıtsız'
};