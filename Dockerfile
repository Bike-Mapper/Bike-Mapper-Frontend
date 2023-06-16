FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update 
RUN apt-get install -y \
    git \
    npm \
    wget

