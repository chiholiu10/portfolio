# syntax=docker/dockerfile:1
FROM node:22-alpine AS dependencies
WORKDIR /workspace
COPY package.json yarn.lock ./
COPY apps/web/package.json apps/web/package.json
COPY packages/matcher-contracts/package.json packages/matcher-contracts/package.json
RUN yarn install --frozen-lockfile --non-interactive --ignore-scripts

FROM dependencies AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn build

FROM node:22-alpine AS runner
WORKDIR /workspace
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=builder --chown=node:node /workspace/package.json /workspace/yarn.lock ./
COPY --from=builder --chown=node:node /workspace/node_modules ./node_modules
COPY --from=builder --chown=node:node /workspace/packages ./packages
COPY --from=builder --chown=node:node /workspace/apps/web/package.json /workspace/apps/web/next.config.js ./apps/web/
COPY --from=builder --chown=node:node /workspace/apps/web/.next ./apps/web/.next
COPY --from=builder --chown=node:node /workspace/apps/web/public ./apps/web/public
USER node
EXPOSE 3100
CMD ["yarn", "start"]
