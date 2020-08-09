/**
 * @file support command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.GOLD,
      title: 'raze',
      url: 'server will be created soon',
      description: 'Need help or support with Raze Discord Bot?\nDm ! Fvne#9999 for help.\nwe are happy to help you.',
      fields: [
        {
          name: 'Website',
          value: 'google.com'
        }
      ]
    }
  });
};

exports.config = {
  aliases: [ 'ss' ],
  enabled: true
};

exports.help = {
  name: 'support',
  description: 'Sends the invite link to Bastion HQ.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'support',
  example: []
};
