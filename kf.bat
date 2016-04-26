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
	echo cd XAMMP/htdocs/blog
	echo supervisor app.js
)>st2.bat
start st2.bat

