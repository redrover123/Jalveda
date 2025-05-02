int turbidityPin = A0;  // Pin for Turbidity sensor
int tdsPin = A1;        // Pin for TDS sensor

void setup() {
  // Start the serial communication at 9600 baud rate
  Serial.begin(9600);  
}

void loop() {
  // Read the raw values from the turbidity and TDS sensors
  int turbidityRaw = analogRead(turbidityPin);
  int tdsRaw = analogRead(tdsPin);

  // Map the raw sensor readings to the desired range (adjust as needed)
  float turbidityValue = map(turbidityRaw, 0, 1023, 0, 100);  // Example mapping for turbidity
  float tdsValue = map(tdsRaw, 0, 1023, 0, 1000);             // Example mapping for TDS
  
  // Print the sensor readings in a comma-separated format
  Serial.print("Turbidity:");
  Serial.print(turbidityValue);
  Serial.print(",TDS:");
  Serial.println(tdsValue);

  delay(1000);  // Delay for 1 second before next reading
}
