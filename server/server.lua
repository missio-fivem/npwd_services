if not lib then return end

local messages = {}

lib.callback.register("npwd:services:getMessages", function(_, job)
	return messages[job]
end)

RegisterNetEvent("npwd:services:sendMessage", function(data)
	local src = source
	if not src then return end

	local job = data.job.name
	local content = data.content
	local phoneNumber = data.phoneNumber
	local anonymous = data.anonymous or false


	messages[job] = messages[job] or {}
	messages[job][#messages[job] + 1] = {
		job = job,
		content = content,
		anonymous = anonymous,
		senderNumber = phoneNumber,
	}

	-- local players = QBCore.Functions.GetQBPlayers()

	-- for _, v in pairs(players) do
	-- 	if v.PlayerData.job.name == job then
	-- 		TriggerClientEvent("npwd_services:notify", v.PlayerData.source)
	-- 	end
	-- end
end)
