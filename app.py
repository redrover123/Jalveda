from flask import Flask, render_template, jsonify
import serial
import time

app = Flask(__name__)

# Setup Arduino serial connection (replace 'COM3' with the correct port)
arduino = serial.Serial('COM3', 9600, timeout=1)

@app.route('/')
def index():
    return render_template('index.html')  # Render homepage

@app.route('/get_data')  # API endpoint to get real-time data
def get_data():
    # Read sensor data from Arduino
    line = arduino.readline().decode('utf-8').strip()
    turbidity, tds = line.split(", ")
    
    turbidity_value = turbidity.split(":")[1]
    tds_value = tds.split(":")[1]
    
    # Return the data as JSON
    return jsonify(turbidity=turbidity_value, tds=tds_value)

if __name__ == '__main__':
    app.run(debug=True)
