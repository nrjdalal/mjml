for i in $(find ./src -type f); do
  if [ ${i##*.} = "jpg" ] || [ ${i##*.} = "png" ] || [ ${i##*.} = "webp" ] && [[ $(identify -format "%w" $i) -gt 500 ]]; then
    echo $i && morgify -resize '500x>' $i && echo "Resized"
  fi
done
