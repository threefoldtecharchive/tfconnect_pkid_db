{{- define "redis.FULL_NAME" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name "redis" | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{- define "redis.REDIS_PASSWORD" -}}
{{- .Values.global.REDIS_PASSWORD -}}
{{- end -}}
