---
layout: default
title: Download Mu
i18n: en
---

# Download Mu

There are many ways to install Mu. The simplest is to download the official
installer for Windows or Mac OSX. If you find you cannot install Mu because the
computer you are using is locked down, you should try out PortaMu: a method of
running Mu from a pendrive on Windows or OSX. You can also use
Python's built-in `pip` tool. Some Linux distributions come with Mu packaged
already (and you should use your OS's package manager to install it). Finally,
if you're on Raspbian (the version of Linux for Raspberry Pi) you can install
Mu as a package.

If you're a developer, you can find the source code
[on GitHub](https://github.com/mu-editor/mu).

<div class="media">
  <div class="media-left">
    <img src="/img/windows_logo.png" alt="Windows Logo" class="media-object">
  </div>
  <div class="media-body">
    <h4 class="media-heading">Windows Installer</h4>
    <p><a href="https://github.com/mu-editor/mu/releases/download/1.0.1/mu-editor_1.0.1_win32.exe" class="btn btn-primary" role="button">32-bit</a>
    <a href="https://github.com/mu-editor/mu/releases/download/1.0.1/mu-editor_1.0.1_win64.exe" class="btn btn-primary" role="button">64-bit</a>
    <a href="/en/howto/install_windows" class="btn btn-default" role="button">Instructions</a></p>
  </div>
</div>

<hr/>

<div class="media">
  <div class="media-left">
    <img src="/img/apple_logo.png" alt="Apple Logo" class="media-object">
  </div>
  <div class="media-body">
    <h4 class="media-heading">Mac OSX Installer</h4>
    <p><a href="https://github.com/mu-editor/mu/releases/download/1.0.1/mu-editor_1.0.1_osx.dmg" class="btn btn-primary" role="button">Download</a>
    <a href="/en/howto/install_macos" class="btn btn-default" role="button">Instructions</a></p>
  </div>
</div>

<hr/>

<div class="media">
  <div class="media-left">
    <img src="/img/portamu.png" alt="PortaMu Logo" class="media-object">
  </div>
  <div class="media-body">
    <h4 class="media-heading">PortaMu - Run Mu from a Pendrive</h4>
    <p><a href="https://github.com/mu-editor/mu/releases/download/1.0.1/portamu_1.0.1_win32.zip" class="btn btn-primary" role="button">Windows 32-bit</a>
    <a href="https://github.com/mu-editor/mu/releases/download/1.0.1/portamu_1.0.1_win64.zip" class="btn btn-primary" role="button">Windows 64-bit</a>
    <a href="https://github.com/mu-editor/mu/releases/download/1.0.1/mu-editor_1.0.1_osx.dmg" class="btn btn-primary" role="button">Mac OSX</a>
    <a href="/en/howto/use_portamu" class="btn btn-default" role="button">Instructions</a></p>
  </div>
</div>

<hr/>

<div class="media">
  <div class="media-left">
    <img src="/img/python_logo.png" alt="Python Logo" class="media-object">
  </div>
  <div class="media-body">
    <h4 class="media-heading">Python Package</h4>
        <p><a href="/en/howto/install_with_python" class="btn btn-default" role="button">Instructions</a></p>
  </div>
</div>

<hr/>

<div class="media">
  <div class="media-left">
    <img src="/img/rpi_logo.png" alt="Raspberry Pi Logo" class="media-object">
  </div>
  <div class="media-body">
    <h4 class="media-heading">Raspbian</h4>
        <p><a href="/en/howto/install_raspberry_pi" class="btn btn-default" role="button">Instructions</a></p>
  </div>
</div>

<br/>

<div class="panel panel-danger">
    <div class="panel-heading"><h3 class="panel-title">ATTENTION LINUX USERS!</h3></div>
    <div class="panel-body">
    <p>On Linux, in order for Mu to work with the MicroPython based devices
    you need to ensure you add yourself to the correct permissions group
    (usually the <code>dialout</code> or <code>uucp</code> groups). Also make
    sure that your distribution automatically mounts flash devices, or make
    sure to mount them manually.</p>
    </div>
</div>
