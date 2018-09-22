# Env
export PS1='\[\033]0;$MSYSTEM:\w\007
\033[0;34m\]\h @ \[\033[0;36m\w\[\033[0;32m\]$(__git_ps1 " (%s)")\033[0m\]
\$ ' for Windows
export PS2="$"

# Aliases
alias cp='cp -iv'
alias mv='mv -iv'
alias mkdir='mkdir -pv'
alias ls='ls -F --color=auto --show-control-chars'
alias less='less -FSRXc'
cd() { builtin cd "$@"; ls; }
alias cd..='cd ../'
alias ..='cd ../'
alias ...='cd ../../'
alias .3='cd ../../../'
alias .4='cd ../../../../'
alias .5='cd ../../../../../'
alias .6='cd ../../../../../../'
alias edit='code'
alias f='open -a Finder ./'
alias ~="cd ~"
alias c='clear'
trash () { command mv "$@" ~/.Trash ; }
ql () { qlmanage -p "$*" >& /dev/null; }

# Git alias
alias gst="git status -sb"
alias ga="git add"
alias gaa="git add -A"
alias gcm="git commit -m"
alias gpl="git pull"
alias gps="git push"
alias gll="git log --graph --date=short --pretty=format:'%Cgreen%h %Cblue%cd (%cr) %Cred%an%C(yellow)%d%Creset: %s'"
alias glll="git log --graph --stat --date=short --pretty=format:'%Cgreen%h %Cblue%cd (%cr) %Cred%an%C(yellow)%d%Creset: %s'"
alias gundo="git checkout"
alias gco="git checkout"
alias gdiff="git diff"
alias greset="git reset HEAD"
alias goops="git reset --hard HEAD"
alias gsh="git stash"
alias gnuke="git branch -D"
alias gbr="git checkout -b"
alias gba="git branch -a"
alias gupdate="git fetch -p"
alias squish="git commit -a --amend -C HEAD"