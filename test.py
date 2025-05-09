from js import document

# Just test that Python runs and can manipulate the DOM
document.getElementById("animationContainer").innerHTML = "<p>✅ Pyodide is working!</p>"
