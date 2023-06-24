// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

exports.sendOrderToRestaurant = async (event) => {
  let sendOrderResult = {}
  const sendOrderState = [
    "ok",
    "error",
    "ok",
    "ok",
    "ok",
    "ok",
    "ok",
    "ok",
    "ok",
    "ok",
  ]
  const errorMessages = [
    "could not contact restaurant",
    "could not understand order",
    "unknown error",
  ]

  const sendOrderRandom = Math.floor(Math.random() * sendOrderState.length)

  if (sendOrderState[sendOrderRandom] == "error") {
    let errorRandom = Math.floor(Math.random() * errorMessages.length)
    sendOrderResult["errorMessage"] = errorMessages[errorRandom]
  }

  sendOrderResult["status"] = sendOrderState[sendOrderRandom]

  console.log(sendOrderResult)
  return sendOrderResult
}
