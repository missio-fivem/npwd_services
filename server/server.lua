if not lib then return end

local messages = {}

lib.callback.register("npwd:services:getMessages", function(_, job)
	return messages[job]
end)

RegisterNetEvent("npwd:services:sendMessage", function(data)
	local src = source
	if not src then return end

	local job = data.job
	local content = data.content
	local anonymous = data.anonymous
	local phoneNumber = exports.npwd.getPlayerData({ source = src }).phoneNumber

	messages[job] = messages[job] or {}

	messages[job][#messages[job] + 1] = {
		job = job,
		content = content,
		anonymous = anonymous,
		senderNumber = phoneNumber,
	}
end)
