# Git
# Comment these functions incase of Windows
git-branch() {
     git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

git-dirty() {
  # check if we're in a git repo
  command git rev-parse --is-inside-work-tree &>/dev/null || return
  # check if it's dirty
  # using these emoji make multi line commands be broken and appear on one line. shrug.
  #command git diff --quiet --ignore-submodules HEAD &>/dev/null; [ $? -eq 1 ] && echo '☔️' || echo '☀️'
  command git diff --quiet --ignore-submodules HEAD &>/dev/null; [ $? -eq 1 ] && echo '⛈' || echo '🌞'
}

# Env
export PS1="\e[1;34m\n\h @ \e[0;36m\w\e[0;32m\$(git-branch) \$(git-dirty)\e[m\n$ "
export PS2="$"

# Aliases
alias cp='cp -iv'
alias mv='mv -iv'
alias mkdir='mkdir -pv'
alias ls='ls -FHG'
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