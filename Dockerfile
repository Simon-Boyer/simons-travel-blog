FROM klakegg/hugo:0.101.0-alpine
ENV HUGO_ENV=production

COPY . /src
CMD ["server", "--disableFastRender", "--disableLiveReload", "-bhttps://blog.codegameeat.com/"]