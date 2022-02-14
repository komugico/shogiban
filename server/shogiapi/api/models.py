from django.db import models

from users.models import Player

# Create your models here.
class Taikyoku(models.Model):
    STATUS_SET = (
        ('W', 'Waiting'),       # 対局待ち
        ('C', 'Closed'),        # 解散
        ('G', 'OnGame'),        # 対局中
        ('F', 'Finished'),      # 対局終了
    )
    TEAI_SET = (
        ('H', 'Hirate'),        # 平手
    )
    RESULT_SET = (
        ('N', 'NotYet'),        # 終局前
        ('S', 'SenteWin'),      # 先手勝ち
        ('G', 'GoteWin'),       # 後手勝ち
        ('D', 'Draw'),          # 引き分け
    )

    sente = models.ForeignKey(Player, related_name='sente', on_delete=models.PROTECT, blank=True, null=True)
    gote = models.ForeignKey(Player, related_name='gote', on_delete=models.PROTECT, blank=True, null=True)
    status = models.CharField(max_length=1, choices=STATUS_SET)
    teai = models.CharField(max_length=1, choices=TEAI_SET)
    start = models.DateTimeField(blank=True, null=True)
    end = models.DateTimeField(blank=True, null=True)
    jikan = models.IntegerField(default=30)
    byoyomi = models.IntegerField(default=60)
    result = models.CharField(max_length=1, choices=RESULT_SET)

    def __repr__(self):
        sente_username = ""
        gote_username = ""
        if self.sente is not None:
            sente_username = self.sente.username
        if self.gote is not None:
            gote_username = self.gote.username
        return "{0:6d}: ☗{1:s} vs. ☖{2:s} (持ち時間：{3:3d}分、秒読み：{4:02d}秒)".format(self.pk, sente_username, gote_username, self.jikan, self.byoyomi)

    __str__ = __repr__

class Kifu(models.Model):
    taikyoku = models.ForeignKey('Taikyoku', on_delete=models.PROTECT)
    kyokumen = models.CharField(max_length=256)
    turn = models.IntegerField(default=0)
    move = models.CharField(max_length=16, default="", blank=True, null=True)
    before = models.ForeignKey('Kifu', on_delete=models.PROTECT, blank=True, null=True)
    minutes = models.IntegerField(default=0)

    def __repr__(self):
        return "{0:8d}: 対局[{1:6d}] {2:d}手目".format(self.pk, self.taikyoku.pk, self.turn)

    __str__ = __repr__