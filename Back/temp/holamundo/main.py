from flask import Flask, request, jsonify

# Crear la aplicación Flask
app = Flask(__name__)

@app.route("/")
def inicio():
    return jsonify({"mensaje": "Bienvenido al microservicio de suma con Flask 🚀"})

@app.route("/sumar", methods=["POST"])
def sumar():
    datos = request.get_json()

    # Validar que se envíen los campos 'a' y 'b'
    if not datos or "a" not in datos or "b" not in datos:
        return jsonify({"error": "Debes enviar los valores 'a' y 'b' en formato JSON"}), 400

    try:
        a = float(datos["a"])
        b = float(datos["b"])
        resultado = a + b
        return jsonify({"resultado": resultado})
    except ValueError:
        return jsonify({"error": "Los valores deben ser numéricos"}), 400

# Punto de entrada del servidor Flask
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)