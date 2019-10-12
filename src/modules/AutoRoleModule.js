const { Module } = require('../')
const { Role } = require('discord.js')

const Joi = require('@hapi/joi')

// Autorole
module.exports = class AutoRoleModule extends Module {
  constructor (client) {
    super('autoRole', client)
    this.displayName = 'Auto Role'

    this.defaultState = false
    this.defaultValues = { userRoles: [], botRoles: [] }
  }

  specialInput (guildId, userId) {
    return { roles: this.rolesWhitelist(guildId, userId) }
  }

  rolesWhitelist (guildId, userId, idOnly = false) {
    const guild = this.client.guilds.get(guildId)
    if (!guild) return []
    const member = guild.member(userId)
    const filteredRoles = guild.roles
      .filter(r => r.editable && r.id !== guildId && member.highestRole.comparePositionTo(r) > 0)
      .sort(Role.comparePositions)
      .map(r => ({
        id: r.id,
        name: r.name
      }))
    return idOnly ? filteredRoles.map(r => r.id) : filteredRoles
  }

  validateValues (entity, guildId, userId) {
    const whitelist = this.rolesWhitelist(guildId, userId, true)
    const whitelistSchema = Joi.array().items(Joi.string().valid(...whitelist)).unique().sparse()
    const { error, value } = Joi.object().keys({
      userRoles: whitelistSchema,
      botRoles: whitelistSchema
    }).validate(entity)
    if (error) throw error
    return value
  }
}
