from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/multiply', methods=['POST'])
def multiply_numbers():
    try:
        data = request.get_json()
        
        if not data or 'num1' not in data or 'num2' not in data:
            return jsonify({
                "error": "Se requieren los parámetros 'num1' y 'num2'"
            }), 400
        
        num1 = float(data['num1'])
        num2 = float(data['num2'])
        resultado = num1 * num2
        
        return jsonify({
            "num1": num1,
            "num2": num2,
            "operacion": "multiplicación",
            "resultado": resultado
        })
        
    except ValueError:
        return jsonify({
            "error": "Los parámetros deben ser números válidos"
        }), 400
    except Exception as e:
        return jsonify({
            "error": f"Error interno: {str(e)}"
        }), 500

@app.route('/multiply/<float:num1>/<float:num2>', methods=['GET'])
def multiply_get(num1, num2):
    resultado = num1 * num2
    return jsonify({
        "num1": num1,
        "num2": num2,
        "operacion": "multiplicación",
        "resultado": resultado
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "multiplication-microservice"
    })

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Microservicio de Multiplicación",
        "endpoints": {
            "POST /multiply": "Multiplicar dos números (JSON)",
            "GET /multiply/num1/num2": "Multiplicar vía URL parameters",
            "GET /health": "Estado del servicio"
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)