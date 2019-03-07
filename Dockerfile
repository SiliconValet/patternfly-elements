FROM node:carbon

WORKDIR /usr/src/app


# Install dependencies.
#RUN NODE_ENV=production node --max_semi_space_size=1 --max_old_space_size=198 --optimize_for_size \
#RUN node --max_semi_space_size=1 --max_old_space_size=198 --optimize_for_size `which npm` install --global yo
RUN npm install --global yo
RUN chown -R node.node /usr/local/lib/node_modules
USER node

CMD ["tail", "-f", "/dev/null"]
t