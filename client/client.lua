if not lib then return end

RegisterNUICallback("npwd:services:callPlayer", function(data, cb)
	exports.npwd:startPhoneCall(tostring(data.number))
	cb({})
end)

RegisterNUICallback("npwd:services:getJobs", function(data, cb)
	cb(Config.Jobs)
end)

RegisterNUICallback("npwd:services:getMessages", function(data, cb)
	local messages = lib.callback.await("npwd:services:getMessages", false, data.job)
	cb(messages)
end)

RegisterNUICallback("npwd:services:sendMessage", function(data, cb)
	TriggerServerEvent("npwd:services:sendMessage", data)
	cb({})
end)
