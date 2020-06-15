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
    libmicrohttpd-dev \
    curl-dev \
    libwebsockets-dev

# 编译 usrsctp
RUN git clone https://gitee.com/chendaliang/usrsctp.git \
    && cd /usrsctp \
    && git checkout master \
    && ./bootstrap  \
    && ./configure --prefix=/usr \
    && make \
    && make install \
    && rm -rf /usrsctp

# 编译 janus-gateway
RUN cd / && git clone https://gitee.com/chendaliang/janus-gateway.git
RUN cd /janus-gateway  \
    && git checkout jjy  \
    && sh autogen.sh  \
    && ./configure -h\
    && ./configure \
    --prefix=/opt/janus \
    --disable-data-channels \
    --enable-websockets \
    --enable-rest \
    --disable-unix-sockets \
    # --disable-nanomsg \
    --disable-websockets-event-handler \
    # --disable-rabbitmq-event-handler \
    # --disable-mqtt-event-handler \
    # --disable-nanomsg-event-handler \
    --disable-sample-event-handler \
    # --disable-plugin-sip \
    --disable-plugin-nosip \
    --disable-plugin-streaming \
    --disable-plugin-textroom \
    --disable-plugin-videocall \
    # --disable-plugin-voicemail \
    --disable-plugin-recordplay \
    --disable-plugin-echotest \
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
    libmicrohttpd-dev \
    curl-dev \
    libwebsockets-dev

# 安装运行时
RUN apk add --purge --no-cache \
    libconfig \
    libnice \
    jansson \
    libsrtp \
    libmicrohttpd \
    libcurl \
    libwebsockets

# 文件夹
RUN mkdir -p /opt/janus/lib/janus/transports \
    && mkdir -p /opt/janus/lib/janus/loggers \
    && mkdir -p /opt/janus/lib/janus/events

CMD ["/opt/janus/bin/janus"]
