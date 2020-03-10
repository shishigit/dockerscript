FROM alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 安装编译
RUN apk add --purge --no-cache \
    git \
    autoconf \
    automake \
    libtool \
    pkgconfig \
    gcc \
    libc-dev \
    glib-dev \
    libconfig-dev \
    libnice-dev \
    jansson-dev \
    openssl-dev \
    libsrtp-dev \
    zlib-dev \
    gengetopt \
    make \
    libwebsockets-dev

# 编译 usrsctp
RUN git clone https://gitee.com/chendaliang/usrsctp.git \
    && cd /usrsctp \
    && git checkout jjy \
    && ./bootstrap  \
    && ./configure --prefix=/usr \
    && make \
    && make install \
    && rm -rf /usrsctp

# 编译 janus-gateway
RUN cd / \
    && git clone https://gitee.com/chendaliang/janus-gateway.git \
    && cd /janus-gateway  \
    && git checkout jjy  \
    && sh autogen.sh  \
    && ./configure --prefix=/opt/janus \
        --disable-websockets \
        --disable-turn-rest-api \
        --enable-rest \
        --disable-rabbitmq \
        --disable-mqtt \
        --disable-unix-sockets \
        --disable-nanomsg \
        --enable-sample-event-handler \
        --disable-rabbitmq-event-handler \
        --disable-mqtt-event-handler \
        --disable-nanomsg-event-handler \
    && make \
    && make install \
    && make configs \
    && rm -rf /janus-gateway

# 清理编译
RUN apk del --purge -r \
    git \
    autoconf \
    automake \
    libtool \
    pkgconfig \
    gcc \
    libc-dev \
    glib-dev \
    libconfig-dev \
    libnice-dev \
    jansson-dev \
    openssl-dev \
    libsrtp-dev \
    zlib-dev \
    gengetopt \
    make \
    libwebsockets-dev

# 安装运行时
RUN apk add --purge --no-cache \
    libconfig \
    libnice \
    jansson \
    libsrtp \
    libwebsockets

# 文件夹
RUN mkdir -p /opt/janus/lib/janus/transports \
    && mkdir -p /opt/janus/lib/janus/loggers

CMD /opt/janus/bin/janus -e
