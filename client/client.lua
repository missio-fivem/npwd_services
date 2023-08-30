if not lib then return end

RegisterNUICallback("npwd:services:callPlayer", function(data, cb)
	exports.npwd:startPhoneCall(tostring(data.number))
	cb("ok")
end)

RegisterNUICallback("npwd:services:getJobs", function(data, cb)
	cb(Config.Jobs)
end)

RegisterNUICallback("npwd:services:getMessages", function(data, cb)
	local messages = lib.callback.await("npwd:services:getMessages", false, data.job)
	cb(messages)
end)

RegisterNUICallback("npwd:services:sendMessage", function(data, cb)
	data.phoneNumber = exports.npwd:getPhoneNumber()
	TriggerServerEvent("npwd:services:sendMessage", data)
	cb("ok")
end)

RegisterNUICallback("npwd:services:getJob", function(data, cb)
	cb(PlayerData.job.name)
end)

-- RegisterNetEvent("npwd_services:notify", function()
-- 	exports["npwd"]:createNotification({
-- 		notisId = "npwd:newservicemessage",
-- 		appId = "services",
-- 		content = "Uusi viesti työsovelluksessa!",
-- 		secondaryTitle = "Työsovellus",
-- 		keepOpen = false,
-- 		duration = 5000,
-- 		path = "/services",
-- 	})
-- end)
