# ทุกครั้งที่ build 
FROM node:15-alpine 
# node run บนรีนุค version 15-alpine
WORKDIR /client
# สร้าง directior(สร้างFolderแล้วเข้าไปในนั้นเลย)+ทำงานใน(cd /app) /app
COPY package.json /client/
COPY package-lock.json .
#copy package*.json ลง /app

RUN npm i
#install node 
COPY . /client/
EXPOSE 3000
#ก็อปทุกอย่างในงานลง /app
CMD [ "npm" ,"start"]
#start


