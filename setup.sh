clear
echo "Instalando Node.js"

echo "Instalando Loopback"

echo "Instalando Componentes"
npm install
echo "Creando Base de Datos"
mysql --user=root --password=alumno -e "CREATE DATABASE ejemplo"
clear
echo "Ya puedes arrancar node, recuerda antes activar el automigrate"