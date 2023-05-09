for i in $(find ./src -type f); do
  if [ ${i##*.} = "jpg" ] || [ ${i##*.} = "png" ] || [ ${i##*.} = "webp" ] && [[ $(identify -format "%w" $i) -gt 499 ]]; then
    morgify -resize '499x>' $i
  fi
done
