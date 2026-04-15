import ServiceDetail from '@/components/ServiceDetail'

export const metadata = {
  title: 'Embedded Systems & IoT — Dynamik Design Lab',
  description:
    'ESP32-based custom PCBs, IoT firmware, sensor integration, and electromechanical prototypes from breadboard to product-ready.',
}

export default function EmbeddedPage() {
  return (
    <ServiceDetail
      eyebrow="04 — EMBEDDED SYSTEMS"
      title="Embedded Systems & IoT"
      hero="https://picsum.photos/seed/emb-hero/2400/1400"
      intro={[
        'Hardware that has to do something — read a sensor, drive a motor, talk to a phone — needs more than a printed shell. We design the PCB, write the firmware, and integrate the electronics with the enclosure all in one workflow.',
        'Our default platform is the ESP32 — proven, well-supported, and cost-effective for IoT, BLE, and Wi-Fi products.',
        'For smaller projects we also work with STM32, Arduino-class boards, and Raspberry Pi where appropriate.',
      ]}
      whyUs={[
        'Schematic, PCB, firmware, and enclosure under one roof',
        'ESP32, STM32, and Arduino expertise',
        'BLE, Wi-Fi, LoRa, and cellular comms',
        'Working prototypes — not just dev-board demos',
      ]}
      capabilities={[
        {
          n: '01',
          title: 'Architecture',
          body: 'Choose the right microcontroller, sensors, comms, and power architecture for the use case.',
        },
        {
          n: '02',
          title: 'Schematic & PCB',
          body: 'Schematic in KiCad or Altium. Two-layer or four-layer boards based on signal requirements.',
        },
        {
          n: '03',
          title: 'Fabrication & assembly',
          body: 'PCB fabrication via trusted partners, hand-assembly in our lab for low quantities.',
        },
        {
          n: '04',
          title: 'Firmware',
          body: 'Bare-metal C, ESP-IDF, or Arduino-framework. State machines, comms stacks, OTA updates.',
        },
        {
          n: '05',
          title: 'Integration',
          body: 'Mount the board into the printed enclosure, route cables, validate fit and serviceability.',
        },
        {
          n: '06',
          title: 'Bring-up & test',
          body: 'Bench validation, power consumption profile, comms range testing.',
        },
      ]}
      capabilityImage="https://picsum.photos/seed/emb-capabilities/1200/1500"
      specs={[
        { param: 'MCU Platforms', value: 'ESP32, ESP32-S3, STM32, ATmega, RP2040' },
        { param: 'Comms', value: 'Wi-Fi, BLE, LoRa, RS-485, CAN, Cellular (4G modem)' },
        { param: 'Sensors', value: 'IMU, ToF, environmental, current, temperature, custom analog' },
        { param: 'PCB Design Tools', value: 'KiCad, Altium Designer' },
        { param: 'Assembly', value: 'In-house hand assembly for prototypes; partner SMT for runs' },
        { param: 'Typical Project', value: '3 – 8 weeks for a custom prototype' },
      ]}
      materials={['ESP32', 'STM32', 'Arduino', 'KiCad', 'Altium', 'BLE', 'LoRa', 'Wi-Fi']}
      category="Embedded"
    />
  )
}
