del st.bat
del st1.bat
del st2.bat
echo off
(
	echo f:
	echo cd MongoDB/bin
	echo mongod --dbpath f:/MongoDB/data
)>st.bat
start st.bat
echo off
(
	echo f:
	echo cd MongoDB/bin
	echo mongo
)>st1.bat
start st1.bat

echo off
(
	echo f:
<<<<<<< HEAD
	echo cd blog
=======
	echo cd XAMMP/htdocs/blog
>>>>>>> 13c988aba771aa17e1e5a34dc7a5ef9952cf38f6
	echo supervisor app.js
)>st2.bat
start st2.bat

