function dht11 () {
    NPNBitKit.DHT11Read(DigitalPin.P3)
    serial.writeString("!1:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    basic.pause(100)
    serial.writeString("!1:HUMI:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(10000)
}
function gas () {
    gas_raw = pins.analogReadPin(AnalogPin.P10)
    gas_percent = Math.map(gas_raw, 0, 1023, 0, 4)
    basic.pause(10000)
}
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    cmd = serial.readUntil(serial.delimiters(Delimiters.Hash))
    if (cmd == "led0") {
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else if (cmd == "led1") {
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else if (cmd == "pump2") {
        pins.digitalWritePin(DigitalPin.P0, 0)
    } else if (cmd == "pump3") {
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
})
let cmd = ""
let gas_percent = 0
let gas_raw = 0
led.enable(false)
basic.forever(function () {
    dht11()
    gas()
})
