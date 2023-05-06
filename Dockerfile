FROM public.ecr.aws/lambda/nodejs:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM public.ecr.aws/lambda/nodejs:16

COPY package*.json ${LAMBDA_TASK_ROOT}/

RUN npm ci --omit=dev && rm package-lock.json node_modules/.package-lock.json

COPY --from=build /app/dist ${LAMBDA_TASK_ROOT}

CMD ["lambda.handler"]
