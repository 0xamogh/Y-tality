void setup() {
  // initialize the serial communication:
  Serial.begin(9600);
  pinMode(10, INPUT); // Setup for leads off detection LO +k
  pinMode(11, INPUT); // Setup for leads off detection LO -

}

void loop() {
    int sensorValue = analogRead(A1);
      float voltage = sensorValue * (5.0 / 1023.0);
  if((digitalRead(10) == 1)||(digitalRead(11) == 1)){
    Serial.print('!');
    Serial.print("\t");
  Serial.print(voltage);
  Serial.print("\n");
  }
  else{
    // send the value of analog input 0:
      Serial.print(analogRead(A0));
      Serial.print("\t");
  Serial.print(voltage*100);
  Serial.print("\n");
  }
  delay(20);
 // read the input on analog pin 0:
  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
  // print out the value you read:
  //Wait for a bit to keep serial data from saturating
}
